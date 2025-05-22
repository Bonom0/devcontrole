"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z
    .string()
    .email({ message: "Email inválido" })
    .min(1, { message: "Email é obrigatório" }),
  phone: z.string().refine(
    (value) => {
      return (
        /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) ||
        /^\d{2}\s\d{9}$/.test(value) ||
        /^\d{11}$/.test(value)
      );
    },
    {
      message: "O número de telefone deve estar no padrão (XX) XXXXX-XXXX",
    }
  ),
  address: z.string(),
});

type FormData = z.infer<typeof schema>;

export function NewCustomerForm({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  async function handleRegisterCustomer(data: FormData) {
    const response = await api.post("/api/customer", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      userId: userId,
    });

    router.refresh();
    router.replace("/dashboard/customer");
  }

  return (
    <form
      className="flex flex-col mt-6"
      onSubmit={handleSubmit(handleRegisterCustomer)}
    >
      <label className="mb-1 text-lg font-medium">Nome completo</label>
      <Input
        type="text"
        name="name"
        placeholder="Digite seu nome completo"
        error={errors.name?.message}
        register={register}
      />

      <section className="flex gap-2 my-2 flex-col sm:flex-row">
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Telefone</label>
          <Input
            type="text"
            name="phone"
            placeholder="Ex: (XX) XXXXX-XXXX"
            error={errors.phone?.message}
            register={register}
          />
        </div>

        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">E-mail</label>
          <Input
            type="text"
            name="email"
            placeholder="Digite seu melhor e-mail"
            error={errors.email?.message}
            register={register}
          />
        </div>
      </section>

      <label className="mb-1 text-lg font-medium">Endereço completo</label>
      <Input
        type="text"
        name="address"
        placeholder="Digite seu endereço completo"
        error={errors.address?.message}
        register={register}
      />

      <button
        type="submit"
        className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold cursor-pointer"
      >
        Cadastrar
      </button>
    </form>
  );
}
