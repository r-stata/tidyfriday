!function(){function r(t){"object"==typeof t&&(this.minChars=t.minChars,this.style=t.style,this.showToken=t.showToken),null==this.style&&(this.style="matchhighlight"),null==this.minChars&&(this.minChars=2),this.overlay=this.timeout=null}function o(t){var e=t.state.matchHighlighter;clearTimeout(e.timeout),e.timeout=setTimeout(function(){s(t)},100)}function s(i){i.operation(function(){var t,e=i.state.matchHighlighter;e.overlay&&(i.removeOverlay(e.overlay),e.overlay=null),!i.somethingSelected()&&e.showToken?(t=i.getTokenAt(i.getCursor()).string,/\w/.test(t)&&i.addOverlay(e.overlay=n(t,!0,e.style))):i.getCursor("head").line==i.getCursor("anchor").line&&(t=i.getSelection().replace(/^\s+|\s+$/g,"")).length>=e.minChars&&i.addOverlay(e.overlay=n(t,!1,e.style))})}function n(i,r,o){return{token:function(t){if(t.match(i)&&(!r||((e=t).start||/.\b./.test(e.string.slice(e.start-1,e.start+1)))&&(e.pos==e.string.length||/.\b./.test(e.string.slice(e.pos-1,e.pos+1)))))return o;var e;t.next(),t.skipTo(i.charAt(0))||t.skipToEnd()}}}CodeMirror.defineOption("highlightSelectionMatches",!1,function(t,e,i){i&&i!=CodeMirror.Init&&((i=t.state.matchHighlighter.overlay)&&t.removeOverlay(i),clearTimeout(t.state.matchHighlighter.timeout),t.state.matchHighlighter=null,t.off("cursorActivity",o)),e&&(t.state.matchHighlighter=new r(e),s(t),t.on("cursorActivity",o))})}();