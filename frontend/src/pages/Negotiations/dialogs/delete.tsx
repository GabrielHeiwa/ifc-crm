import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useNegotiationStore } from "../negotiations.store";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api";
import { toast } from "sonner";
import { queryClient } from "@/routes";

export function DeleteNegotiationDialog() {
	// Hooks
	const {
		deleteNegotiationDialogVisible,
		setDeleteNegotiationDialogVisible,
		negotiationSelected,
	} = useNegotiationStore();

	// Mutations
	const deleteNegotiation = useMutation({
		mutationFn: () =>
			api.delete("/negotiations/" + negotiationSelected?.id!),
		mutationKey: ["delete-negotiation"],
	});

	async function onSubmit() {
		await deleteNegotiation.mutateAsync();

		await queryClient.invalidateQueries({
			queryKey: ["get-negotiations"],
		});

		toast.success("Negociação deletada com sucesso.");

		setDeleteNegotiationDialogVisible(false);
	}

	return (
		<Dialog
			open={deleteNegotiationDialogVisible}
			onOpenChange={setDeleteNegotiationDialogVisible}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Apagar uma Negociação</DialogTitle>
					<DialogDescription>
						Está ação irá apagar permanentemente uma negociação
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<Button
						variant={"ghost"}
						onClick={() => setDeleteNegotiationDialogVisible(false)}
					>
						Cancelar
					</Button>
					<Button
						variant={"destructive"}
						onClick={() => onSubmit()}
					>
						Apagar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
