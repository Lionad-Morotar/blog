const isMac = () => CodeMirror.keyMap.default === CodeMirror.keyMap.macDefault

export default function(el, opts = {}) {
    const editor = CodeMirror.fromTextArea(el, {
        lineNumbers: true,
        lineWrapping: true,
        styleActiveLine: true,
        matchTags: { bothTags: true },
        matchBrackets: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        ...opts
    })

    editor.setOption('extraKeys', {
        ...editor.getOption('extraKeys'),
        Tab(cm) {
            // Indent, or place 2 spaces
            if (cm.somethingSelected()) {
                cm.indentSelection('add')
            } else if (cm.getOption('mode').indexOf('html') > -1) {
                try {
                    cm.execCommand('emmetExpandAbbreviation')
                } catch (err) {
                    console.error(err)
                }
            } else {
                const spaces = Array(cm.getOption('indentUnit') + 1).join(' ')
                cm.replaceSelection(spaces, 'end', '+input')
            }
        },
        [isMac() ? 'Cmd-/' : 'Ctrl-/'](cm) {
            cm.toggleComment()
        }
    })

    editor.on('gutterClick', (cm, line, gutter) => {
        if (gutter === 'CodeMirror-linenumbers') {
            // eslint-disable-next-line new-cap
            return cm.setSelection(CodeMirror.Pos(line, 0), CodeMirror.Pos(line + 1, 0))
        }
    })

    return editor
}
