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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export function ViewNegotiationDialog() {
	// Hooks
	const {
		viewNegotiationDialogVisible,
		negotiationSelected,
		setViewNegotiationDialogVisible,
	} = useNegotiationStore();

	return (
		<Dialog
			open={viewNegotiationDialogVisible}
			onOpenChange={setViewNegotiationDialogVisible}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Detalhes da Negociação</DialogTitle>
					<DialogDescription>
						Abaixo segue os detalhes dos produtos negociados
					</DialogDescription>
				</DialogHeader>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>Nome</TableHead>
							<TableHead>Preço</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{negotiationSelected?.NegotiationProduct.map(
							({ product }: any) => (
								<TableRow>
									<TableCell>{product.id}</TableCell>
									<TableCell>{product.name}</TableCell>
									<TableCell>
										{new Intl.NumberFormat("pt-br", {
											style: "currency",
											currency: "BRL",
										}).format(product.price)}
									</TableCell>
								</TableRow>
							)
						)}
					</TableBody>
				</Table>

				<DialogFooter>
					<Button
						variant={"ghost"}
						onClick={() => setViewNegotiationDialogVisible(false)}
					>
						Fechar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
