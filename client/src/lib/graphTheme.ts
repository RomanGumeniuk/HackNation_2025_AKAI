export type ThemeColor = number | string;

export interface Theme {
    canvas: {
        background: ThemeColor;
    };
    node: {
        fill: ThemeColor;
        activeFill: ThemeColor;
        opacity: number;
        selectedOpacity: number;
        inactiveOpacity: number;
        label: {
            color: ThemeColor;
            stroke: ThemeColor;
            activeColor: ThemeColor;
        };
        subLabel?: {
            color: ColorRepresentation;
            stroke?: ColorRepresentation;
            activeColor: ColorRepresentation;
        };
    };
    ring: {
        fill: ThemeColor;
        activeFill: ThemeColor;
    };
    edge: {
        fill: ThemeColor;
        activeFill: ThemeColor;
        opacity: number;
        selectedOpacity: number;
        inactiveOpacity: number;
        label: {
            color: ThemeColor;
            stroke: ThemeColor;
            activeColor: ThemeColor;
            fontSize: number;
        }
    };
    arrow: {
        fill: ThemeColor;
        activeFill: ThemeColor;
    };
    lasso: {
        background: string;
        border: string;
    };
    cluster?: {
        stroke?: ColorRepresentation;
        fill?: ColorRepresentation;
        opacity?: number;
        selectedOpacity?: number;
        inactiveOpacity?: number;
        label?: {
            stroke?: ColorRepresentation;
            color: ColorRepresentation;
            fontSize?: number;
            offset?: [number, number, number];
        };
    };
}