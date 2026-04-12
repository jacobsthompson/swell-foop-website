import "../stylesheets/header.css";

export default function Header({height, minHeight, maxHeight}) {
    const compact = height === minHeight;

    return (
        <div className="header-container"
             style={{
                 position: compact ? "absolute" : "initial",
                 height: height
            }}
        >
            <div className="header-logo"/>
        </div>
    )
}


