declare global {
    interface Window {
        Loading: {
            Show: () => void;
            Hide: () => void;
        }
    }
}

export class Loading {

    public static Show = () => {
        window.Loading.Show();
    }

    public static Hide = () => {
        window.Loading.Hide();
    }

}