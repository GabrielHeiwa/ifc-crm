import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { useNegotiationStore } from "../negotiations.store";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

export function CreateNegotiationDialog() {
	// Hooks
	const form = useForm();
	const {
		setCreateNegotiationDialogVisible,
		createNegotiationDialogVisible,
	} = useNegotiationStore();

	// Refs
	const formRef = useRef<HTMLFormElement | null>(null);

	// Functions
	async function onSubmit(data: any) {
		console.log(data);
	}

	return (
		<Dialog
			open={createNegotiationDialogVisible}
			onOpenChange={setCreateNegotiationDialogVisible}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Nova Negociação</DialogTitle>
					<DialogDescription>
						Está ação criará uma nova Negociação
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						ref={formRef}
					>
						<FormField
							name='description'
							control={form.control}
							render={({ field }) => <Input {...field} />}
						/>
					</form>
				</Form>

				<DialogFooter>
					<Button variant={"ghost"}>Cancelar</Button>
					<Button>Criar</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
