import styled from "@emotion/styled";

interface OverlayProps {
    text?: string
}
export function LoadingOverlay({ text }: OverlayProps) {
    return <OverlayContainer>
        <div>
            {text || "Загрузка..."}
        </div>
    </OverlayContainer>
}

const OverlayContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 11;
    background: #e0e0e029;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em; 
`