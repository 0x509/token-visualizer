import {AutoTokenizer, pipeline} from '@xenova/transformers';

// let classifier = await pipeline('sentiment-analysis');
let tokenizer = await AutoTokenizer.from_pretrained("Xenova/bert-base-uncased");

function generate_embeddings(input_str) {
  document.getElementById("tok_viz").innerHTML = ""
  for (let tok of tokenizer.encode(input_str)) {
    let tok_s = tokenizer.decode([tok]);
    let tmpl = document.createElement('template');
    tmpl.innerHTML = "<div class='tok'><span class='tok_s'>" + tok_s + "</span><span class='tok_i'>" + tok + "</span></div>"
    document.getElementById("tok_viz").append(tmpl.content.children[0])
  }
}

let tok_input = document.getElementsByName("tok_input")[0]
function updateTokViz(evt) {
  if (!evt.target.value) {
    generate_embeddings(tok_input.placeholder)
  } else {
    generate_embeddings(evt.target.value)
  }
}
tok_input.addEventListener("keyup", updateTokViz);
generate_embeddings(tok_input.placeholder)
