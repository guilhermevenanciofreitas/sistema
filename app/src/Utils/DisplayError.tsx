import { MessageBox } from "./Controls";

export class DisplayError {

    public static Show = async (err: any) =>
    {

        if ((err?.request?.status || false) == 401) {
            await MessageBox.Show({title: "Ops!", width: 400, type: "Warning", content: err?.response?.data?.message,
                buttons: [
                    { Text: "Ok" },
                ]
            });
            localStorage.removeItem("Session");
            window.location.replace("/login");
            return;
        }

        const r = await MessageBox.Show({title: "Ops!", width: 400, type: "Error", content: "Ocorreu um erro inesperado!",
            buttons: [
                { Text: "Mostrar detalhes", OnClick: () => "yes"},
                { Text: "Ok" },
            ]
        });

        console.log(err);

        if (r == "yes") {
            await MessageBox.Show({title: "Ops!", width: 400, type: "Error", content: err?.message,
                buttons: [
                    { Text: "Ok" }
                ]
            });
        }
    }

}