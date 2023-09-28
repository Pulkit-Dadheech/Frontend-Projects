import "./Button.css";
type MyButton={
    buttonText: string,
    changeButtonText:() => void
}
export function Button({buttonText, changeButtonText}:MyButton) {
    return (
        <>
            <button
                className="square"
                onClick={() => {
                    if ((buttonText !== "X" && buttonText!== "O")) {
                        changeButtonText()
                    }


                }}
            >
               <p> {buttonText}</p>
            </button>
        </>
    )
}