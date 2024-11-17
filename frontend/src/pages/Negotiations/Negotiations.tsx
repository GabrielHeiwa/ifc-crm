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
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useNegotiationStore } from "./negotiations.store";
import { CreateNegotiationDialog } from "./dialogs/create";

export function Negotiations() {
	// Hooks
	const {
		createNegotiationDialogVisible,
		deleteNegotiationDialogVisible,
		editNegotiationDialogVisible,
		negotiationSelected,
		setCreateNegotiationDialogVisible,
		setDeleteNegotiationDialogVisible,
		setEditNegotiationDialogVisible,
		setNegotiationSelected,
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
						return <div>hello world</div>;
					})}
				</TableBody>
			</Table>
		</div>
	);
}
