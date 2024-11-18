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
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import {
	CheckIcon,
	ChevronsUpDownIcon,
	PlusIcon,
	Trash2Icon,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { api } from "@/api";

export function CreateNegotiationDialog() {
	// States
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");
	const [product, setProduct] = useState<any>(undefined);

	// Hooks
	const form = useForm();
	const {
		setCreateNegotiationDialogVisible,
		createNegotiationDialogVisible,
		removeProduct,
		productsAdded,
		addProduct,
	} = useNegotiationStore();

	// Queries
	const getProducts = useQuery({
		queryKey: ["get-products"],
		queryFn: () => api.get("/products"),
	});

	const getSuppliers = useQuery({
		queryKey: ["get-suppliers"],
		queryFn: () => api.get("/suppliers"),
	});

	const getClients = useQuery({
		queryKey: ["get-clients"],
		queryFn: () => api.get("/clients"),
	});

	const products = getProducts.data?.data.map(({ id, name, price }: any) => ({
		value: id,
		label: name,
		price,
	}));

	// Refs
	const formRef = useRef<HTMLFormElement | null>(null);

	// Functions
	async function onSubmit(data: any) {
		console.log({ data });

		data.totalValue = Number(data.totalValue.replaceAll(/\D/gm, "")) / 100;
		data.discount = Number(data.discount.replaceAll(/\D/gm, "")) / 100;

		console.log({ data });
	}

	return (
		<Dialog
			open={createNegotiationDialogVisible}
			onOpenChange={setCreateNegotiationDialogVisible}
		>
			<DialogContent className='max-w-screen-lg'>
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
							render={({ field }) => (
								<FormItem>
									<FormLabel>Descrição</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Descrição ...'
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Descrição da negociação
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='flex flew-row gap-x-4 items-center'>
							<FormField
								name='totalValue'
								control={form.control}
								render={({ field }) => (
									<FormItem className='flex-1'>
										<FormLabel>
											Valor total da negociação
										</FormLabel>
										<FormControl>
											<Input
												placeholder='R$ 1000,00'
												{...field}
												onChange={(e) => {
													const digits =
														Number(
															e.target.value.replace(
																/\D/gm,
																""
															)
														) / 100;
													const currency =
														new Intl.NumberFormat(
															"pt-br",
															{
																style: "currency",
																currency: "BRL",
															}
														).format(digits);

													field.onChange(currency);
												}}
											/>
										</FormControl>
										<FormDescription>
											Valor total da negociação
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								name='discount'
								control={form.control}
								render={({ field }) => (
									<FormItem className='flex-1'>
										<FormLabel>
											Disconto da negociação
										</FormLabel>
										<FormControl>
											<Input
												placeholder='10%'
												{...field}
												onChange={(e) => {
													const digits =
														Number(
															e.target.value.replace(
																/\D/gm,
																""
															)
														) / 100;
													const currency =
														new Intl.NumberFormat(
															"pt-br",
															{
																style: "percent",
																currency: "BRL",
															}
														).format(digits);

													field.onChange(currency);
												}}
											/>
										</FormControl>
										<FormDescription>
											Valor de desconto da negociação
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</form>
				</Form>

				<div className='flex flex-row items-center justify-between'>
					<span className='text-gray-800 font-semibold'>
						Itens da Negociação
					</span>

					<div className='flex flex-row gap-x-4'>
						<Popover
							modal
							open={open}
							onOpenChange={setOpen}
						>
							<PopoverTrigger>
								<Button
									variant='outline'
									role='combobox'
									aria-expanded={open}
									className='justify-between'
								>
									{value
										? products?.find(
												(product: any) =>
													product.value === value
										  )?.label
										: "Selecione um produto"}
									<ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
								</Button>
							</PopoverTrigger>
							<PopoverContent className='p-0'>
								<Command>
									<CommandInput placeholder='Pesquise por um produto' />
									<CommandList>
										<CommandEmpty>
											No framework found.
										</CommandEmpty>
										<CommandGroup>
											{products?.map((product: any) => (
												<CommandItem
													key={product.value}
													value={product.value}
													onSelect={(
														currentValue
													) => {
														setValue(
															currentValue ===
																value
																? ""
																: currentValue
														);
														setOpen(false);
														setProduct(product);
													}}
												>
													<CheckIcon
														className={cn(
															"mr-2 h-4 w-4",
															value ===
																product.value
																? "opacity-100"
																: "opacity-0"
														)}
													/>
													{product.label}
												</CommandItem>
											))}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>

						<Button
							variant={"ghost"}
							onClick={() =>
								addProduct({
									id: product?.value!,
									name: product?.label!,
									price: product?.price!,
								})
							}
						>
							Adicionar Produto
							<PlusIcon className='w-6 h-6' />
						</Button>
					</div>
				</div>

				<Table>
					<TableCaption>Listagem de produtos</TableCaption>
					<TableHeader className='bg-gray-900'>
						<TableRow>
							<TableHead className='text-white'>ID</TableHead>
							<TableHead className='text-white'>Nome</TableHead>
							<TableHead className='text-white'>Preço</TableHead>
							<TableHead className='text-white'></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{productsAdded.map((product: any) => {
							return (
								<TableRow>
									<TableCell>{product.id}</TableCell>

									<TableCell>{product.name}</TableCell>

									<TableCell>
										{new Intl.NumberFormat("pt-BR", {
											style: "currency",
											currency: "BRL",
										}).format(product.price)}
									</TableCell>

									<TableCell className='flex flex-row justify-end gap-x-1'>
										<Toggle
											className='hover:text-red-200 hover:bg-red-600'
											onClick={() =>
												removeProduct(product.id)
											}
										>
											<Trash2Icon className='w-6 h-6' />
										</Toggle>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>

				<DialogFooter>
					<Button variant={"ghost"}>Cancelar</Button>
					<Button onClick={() => formRef.current?.requestSubmit()}>
						Criar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
