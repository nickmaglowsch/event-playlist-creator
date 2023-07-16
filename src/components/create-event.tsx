import React from "react";
import LoggedPage from "@/layout/logged-page";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/utils/api";

const formSchema = z
  .object({
    name: z
      .string()
      .nonempty("evento precisa de um nome")
      .min(3, { message: "Nome mínimo de um evento é de 3 letras" }),
    eventDate: z
      .date()
      .min(new Date(new Date().getTime() + 60 * 60 * 1000), {
        message:
          "Só é possível criar eventos com no mínimo uma hora de antecedência",
      })
      .refine((value) => !isNaN(value.getTime()), {
        message: "Data inválida",
      }),
  })
  .required();

export type FormData = z.infer<typeof formSchema>;

interface CreateEventProps {
  modalRef: React.RefObject<HTMLDialogElement>;
}

const CreateEvent: React.FC<CreateEventProps> = ({ modalRef }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { mutate: newEvent } = api.event.createMyEvent.useMutation({
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    newEvent(data);
    reset();
    modalRef.current?.close();
  };

  return (
    <dialog id="create_modal" className="modal" ref={modalRef}>
      <form
        className="modal-box flex w-80 flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="name">Nome do Evento</label>
        <input
          {...register("name")}
          name="name"
          type="text"
          placeholder="Nome do seu Evento"
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <span className="text-error">
          {errors.name && errors.name.message?.toString()}
        </span>

        <label htmlFor="eventDate">Data do Evento</label>
        <input
          {...register("eventDate", {
            setValueAs: (value: string) => new Date(value),
          })}
          name="eventDate"
          type="datetime-local"
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <span className="text-error">
          {errors.eventDate && errors.eventDate.message?.toString()}
        </span>
        <div className="modal-action">
          <button
            className="btn btn-error btn-outline"
            onClick={() => {
              modalRef.current?.close();
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            criar evento
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default CreateEvent;
