export default function(el, opts = {}) {
    const editor = CodeMirror.fromTextArea(el, {
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true,
        ...opts
    })

    editor.setOption('extraKeys', {
        ...editor.getOption('extraKeys'),
        Tab: cm => {
            console.log('asdf')
            if (cm.somethingSelected()) {
                cm.indentSelection('add')
            } else {
                cm.replaceSelection(Array(cm.getOption('indentUnit') + 1).join(' '), 'end', '+input')
            }
        },
        'Shift-Tab': cm => {
            if (cm.somethingSelected()) {
                cm.indentSelection('subtract')
            } else {
                // TODO
            }
        }
    })

    return editor
}
