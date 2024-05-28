import { useEffect } from "react";
import { type ModalProps } from "@headlessui/react/dist/internal/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/Components/Forms/Input";
import { Button } from "@/Components/Layout/Button";
import Modal from "@/Components/Modal";
import { useTransaction } from "@/Hooks/Api/useTransaction";
import { Intervals, TransactionsTypes, type Transaction } from "@/Types";

export interface ModalTransactionProps {
  transaction?: Transaction;
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function getValues<T extends Record<string, unknown>>(obj: T) {
  return Object.values(obj) as [keyof typeof obj];
}

const schema = z.object({
  description: z.string().min(1, "Description is required"),
  category_id: z.union([z.number().int().positive(), z.nan()]).nullable(),
  type: z.enum(getValues(TransactionsTypes)),
  date: z
    .date()
    .min(new Date("1900-01-01"), { message: "The date is invalid" }),
  recurring: z.boolean(),
  repetition_count: z
    .number()
    .optional()
    .transform((value) => value ?? undefined),
  amount: z.number().gt(0),
  interval: z
    .enum([...getValues(Intervals), ""])
    .optional()
    .transform((value) => value ?? undefined),
});

type schemaType = z.infer<typeof schema>;

export const ModalTransaction = ({
  transaction,
  show,
  onSuccess,
  ...rest
}: ModalTransactionProps & Omit<ModalProps, "show" | "children">) => {
  const { createMutation, updateMutation } = useTransaction();

  const isPending = createMutation.isPending || updateMutation.isPending;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (transaction) {
      reset({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        date: format(new Date(transaction.date), "yyyy-MM-dd"),
        amount: transaction.money.amount,
        description: transaction.description,
        category_id: transaction.category_id,
        type: transaction.type,
        recurring: transaction.recurring,
        interval: transaction.interval,
        repetition_count: transaction.repetition_count ?? 0,
      });
    } else {
      reset({});
    }
  }, [reset, show, transaction]);

  const onSubmit: SubmitHandler<schemaType> = (data) => {
    transaction
      ? updateMutation(
          {
            ...transaction,
            ...data,
            date: format(data.date, "yyyy-MM-dd"),
            money: data.amount,
            interval:
              data.interval == "" || !data.interval ? undefined : data.interval,
            repetition_count: data.repetition_count ?? undefined,
          },
          {
            onSuccess,
          },
        )
      : createMutation.mutate(
          {
            ...data,
            date: format(data.date, "yyyy-MM-dd"),
            money: data.amount,
            interval:
              data.interval == "" || !data.interval ? undefined : data.interval,
            repetition_count: data.repetition_count ?? undefined,
          },
          {
            onSuccess,
          },
        );
  };

  return (
    <Modal show={show} {...rest}>
      <form id="modal-transaction-form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="description"
          label="Description"
          error={errors.description?.message}
          {...register("description")}
        />
        <div className="flex w-full flex-col gap-2 md:flex-row">
          <Input
            id="category_id"
            label="Category"
            {...register("category_id", {
              valueAsNumber: true,
            })}
            error={errors.category_id?.message}
            containerClassName="md:w-1/2"
          />
          <Input
            id="type"
            label="Type"
            {...register("type")}
            error={errors.type?.message}
            containerClassName="md:w-1/2"
          />
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <Input
            id="date"
            label="Date"
            type="date"
            {...register("date", {
              valueAsDate: true,
            })}
            error={errors.date?.message}
            containerClassName="md:w-1/2"
          />
          <Input
            id="money"
            label="Amount"
            {...register("amount", { valueAsNumber: true })}
            type="number"
            error={errors.amount?.message}
            containerClassName="md:w-1/2"
          />
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <Input
            id="interval"
            label="Interval"
            {...register("interval")}
            error={errors.interval?.message}
            containerClassName="md:w-1/2"
          />
          <Input
            id="repetition_count"
            type="number"
            min="0"
            error={errors.repetition_count?.message}
            label="Repetition count"
            {...register("repetition_count", {
              value: 0,
            })}
            containerClassName="md:w-1/2"
          />
        </div>
        <Input
          id="recurring"
          label="Recurring"
          error={errors.recurring?.message}
          {...register("recurring")}
          type="checkbox"
        />

        <Button type="submit" isLoading={isPending} className="mx-auto ">
          {transaction ? "Save Changes" : "Create transaction"}
        </Button>
      </form>
    </Modal>
  );
};
