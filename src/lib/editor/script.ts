export function onKeyDown(e: KeyboardEvent) {
    // @ts-ignore
    if(!document.getElementById("editor").innerHTML.replaceAll(" ", "")) {
        // @ts-ignore
        document.getElementById("editor").innerHTML += ('<p contenteditable="true" class="editor-input"></p>')
        // @ts-ignore
        document.getElementsByClassName("editor-input")[0].focus()
    }
    // @ts-ignore
    if(e.target.classList.contains("editor-input")) {
        if(e.key == "Enter") {
            e.preventDefault();
            // @ts-ignore
            if(e.target.nextElementSibling) {
                // @ts-ignore
                e.target.nextElementSibling.focus();
            }
            else {
                // @ts-ignore
                document.getElementById("editor").innerHTML += ('<p contenteditable="true" class="editor-input"></p>')
                // @ts-ignore
                document.getElementById("editor").lastElementChild.focus()
            }
        }
        // @ts-ignore
        else if(e.key == "Backspace" && (e.target.innerHTML == "" || e.target.innerHTML == "<br>")) {
            // @ts-ignore
            e.target.remove()
            console.log(e.target)
        }
    }
}