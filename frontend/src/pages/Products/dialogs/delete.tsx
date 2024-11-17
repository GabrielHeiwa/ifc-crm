import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
} from "@/components/ui/dialog";
import React from "react";
import { useProductsStore } from "../products.store";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api";
import { toast } from "sonner";
import { queryClient } from "@/routes";
import { DialogTitle } from "@radix-ui/react-dialog";

type DeleteUserDialogProps = {};

type Props = React.PropsWithChildren<DeleteUserDialogProps>;

export function DeleteProductDialog({}: Props) {
	// Hooks
	const {
		productSelected,
		deleteProductDialogVisible,
		setDeleteProductDialogVisible,
	} = useProductsStore();

	// Mutations
	const deleteUser = useMutation({
		mutationKey: ["delete-product"],
		mutationFn: () => api.delete("/products/" + productSelected?.id),
	});

	// Functions
	async function handleDelete() {
		try {
			if (!productSelected)
				return toast.error("Usuário não selecionado para excluir.");

			await deleteUser.mutateAsync();

			await queryClient.invalidateQueries({
				queryKey: ["get-products"],
			});

			toast.success("Usuário excluido com sucesso.");
		} catch (e: any) {
			console.error("Users => Dialog => handleDelete", e);
			toast.error("Houve um erro ao deletar o usuário");
		} finally {
			setDeleteProductDialogVisible(false);
		}
	}

	return (
		<Dialog
			open={deleteProductDialogVisible}
			onOpenChange={setDeleteProductDialogVisible}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Excluir produto</DialogTitle>
					<DialogDescription>
						Esta ação removerá o produto permanentemente do sistema.
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<Button variant={"ghost"}>Cancelar</Button>
					<Button
						variant={"destructive"}
						onClick={() => handleDelete()}
					>
						Excluir
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
