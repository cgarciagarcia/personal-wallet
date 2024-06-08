import { Button } from "@/Components/Layout/Button";
import Modal, { type ModalProps } from "@/Components/Layout/Modal";
import { Text } from "@/Components/Layout/Text";
import { type Transaction } from "@/Types";

export interface ModalDeleteTransactionProps {
  transaction?: Transaction;
  onClose: () => void;
  onAccept: () => void;
  isPending: boolean;
}

export const ModalDeleteTransaction = ({
  transaction,
  onClose,
  onAccept,
  isPending,
}: ModalDeleteTransactionProps & Omit<ModalProps, "children" | "show">) => {
  return (
    <Modal show={!!transaction} onClose={onClose}>
      <div className="flex flex-col items-center">
        <Text className="mb-4">
          Are you sure you want delete{" "}
          <strong>{transaction?.description}</strong> transaction?
        </Text>
        <Button
          variant="complementary"
          className=""
          onClick={onAccept}
          isLoading={isPending}
        >
          Accept
        </Button>
      </div>
    </Modal>
  );
};
