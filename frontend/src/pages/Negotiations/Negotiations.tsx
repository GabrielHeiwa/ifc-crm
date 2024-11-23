import { api } from "@/api";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import {
	ChevronDown,
	Eye,
	Loader2Icon,
	PencilIcon,
	PlusIcon,
	Trash2Icon,
} from "lucide-react";
import { useNegotiationStore } from "./negotiations.store";
import { CreateNegotiationDialog } from "./dialogs/create";
import { Toggle } from "@/components/ui/toggle";
import { ViewNegotiationDialog } from "./dialogs/view";

export function Negotiations() {
	// Hooks
	const {
		createNegotiationDialogVisible,
		deleteNegotiationDialogVisible,
		editNegotiationDialogVisible,
		negotiationSelected,
		viewNegotiationDialogVisible,
		setCreateNegotiationDialogVisible,
		setDeleteNegotiationDialogVisible,
		setEditNegotiationDialogVisible,
		setNegotiationSelected,
		setViewNegotiationDialogVisible
	} = useNegotiationStore();

	// Queries
	const { data, isLoading } = useQuery({
		queryKey: ["get-negotiations"],
		queryFn: () => api.get("negotiations"),
	});

	if (isLoading) {
		return (
			<div className='w-full h-full flex flex-row items-center justify-center gap-x-4'>
				Carregando
				<Loader2Icon className='animate animate-spin' />
			</div>
		);
	}

	return (
		<div className='flex flex-col gap-y-2'>
			{createNegotiationDialogVisible && <CreateNegotiationDialog />}
			{viewNegotiationDialogVisible && <ViewNegotiationDialog />}

			<div className='flex flex-row justify-end items-center'>
				<Button
					variant={"ghost"}
					onClick={() => setCreateNegotiationDialogVisible(true)}
				>
					Nova Negociação
					<PlusIcon className='w-6 h-6' />
				</Button>
			</div>

			<Table>
				<TableHeader className='bg-gray-800'>
					<TableRow>
						<TableHead className='text-white'>ID</TableHead>
						<TableHead className='text-white'>
							Valor Total
						</TableHead>
						<TableHead className='text-white'>Disconto</TableHead>
						<TableHead className='text-white'>Fornecedor</TableHead>
						<TableHead className='text-white'>Cliente</TableHead>
						<TableHead className='text-white'></TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{data?.data.map((negotiation: any) => {
						return (
							<TableRow>
								<TableCell>{negotiation.id}</TableCell>
								<TableCell>
									{new Intl.NumberFormat("pt-br", {
										style: "currency",
										currency: "BRL",
									}).format(negotiation.totalValue)}
								</TableCell>
								<TableCell>
									{new Intl.NumberFormat("pt-br", {
										style: "percent",
									}).format(negotiation.discount)}
								</TableCell>
								<TableCell>
									{negotiation.supplier.user.email}
								</TableCell>
								<TableCell>
									{negotiation.client.user.email}
								</TableCell>
								<TableCell className='flex flex-row justify-end gap-x-1'>
									<Toggle
										className='hover:text-gray-200 hover:bg-gray-600'
										onClick={() => {
											setNegotiationSelected(negotiation);
											setViewNegotiationDialogVisible(true);
										}}
									>
										<Eye className='w-6 h-6' />
									</Toggle>
									<Toggle
										className='hover:text-blue-200 hover:bg-blue-600'
										onClick={() => {
											// setProductSelected(product);
											// setEditProductDialogVisible(true);
										}}
									>
										<PencilIcon className='w-6 h-6' />
									</Toggle>
									<Toggle
										className='hover:text-red-200 hover:bg-red-600'
										onClick={() => {
											// setProductSelected(product);
											// setDeleteProductDialogVisible(true);
										}}
									>
										<Trash2Icon className='w-6 h-6' />
									</Toggle>
								</TableCell>
							</TableRow>
						);
						// return <pre>{JSON.stringify(negotiation, null, 2)}</pre>;
					})}
				</TableBody>
			</Table>
		</div>
	);
}
