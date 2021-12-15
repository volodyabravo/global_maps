interface MapFrameProps {
    children: React.ReactNode;
    type?: "color";
    color?: string;
    padding?: string;
}

export function MapFrame({ children, color, type, padding }: MapFrameProps) {
    return <div style={
        {
            backgroundColor: color,
            padding: padding,
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            // transform: "scale(0.6)",
            display: "flex"
        }
    }>
        {children}
    </div>
}