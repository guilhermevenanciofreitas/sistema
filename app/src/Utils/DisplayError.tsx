import { MessageBox } from "./Controls";
import { Loading } from "./Loading";

export class DisplayError {

    public static Show = async (err: any) =>
    {

        Loading.Hide();
        
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

        if (r == "yes") {
            await MessageBox.Show({title: "Ops!", width: 400, type: "Error", content: err?.message,
                buttons: [
                    { Text: "Ok" }
                ]
            });
        }
    }

}