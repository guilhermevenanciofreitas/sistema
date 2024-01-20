import React, { ReactNode } from "react";


class Width {
    public Open?: number;
    public Closed?: number;
}

export class Menu {
    Width?: Width;
    Status?: 'Closed' | 'Opened' | 'Fixed';
}

class Parameters {
    Title?: string;
    Menu?: Menu;
    children?: ReactNode;
}

export class MainLayoutBase extends React.Component<Parameters> {

    static defaultProps = {
        Menu: { Status: 'Closed', Width: { Open: 260, Closed: 60 }}
    };

    state = {
        Menu: {
            Status: 'Closed'
        }
    }

}