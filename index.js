var juice = require("juice/client");
// var minify = require("html-minifier").minify;

var render = function () {
	var options = {
		applyStyleTags: true,
		removeStyleTags: true,
		preserveMediaQueries: true,
		preserveFontFaces: true,
		applyWidthAttributes: true,
		applyHeightAttributes: true,
		applyAttributesTableElements: true,
		inlinePseudoElements: true,
		xmlMode: false,
		preserveImportant: false,
	};

	var template = document.importNode(
		document.querySelector("#template").content,
		true
	);
	var output = document.querySelector("#output");
	var result = document.querySelector("#result");

	output.innerHTML = "";
	result.value = "";

	var name = document.querySelector("#name").value;
	var title = document.querySelector("#title").value;

	if (name == "") {
		return false;
	}

	template.querySelector(".name").textContent = name;
	template.querySelector(".title").textContent = title;
	output.appendChild(template); // This has to be done so the DocumentFragment can be read into a string

	var html = output.innerHTML.replaceAll(/(\n|\t)/g, "");
	try {
		var inlinedHtml = juice(html, options);

		output.innerHTML = inlinedHtml;
		result.value = inlinedHtml;
	} catch (err) {
		output.innerHTML = "<div style='color: red'>Error: <br/>" + err + "</div>";
		result.value = "";
	}
};

document.addEventListener("DOMContentLoaded", () => {
	render();
});

document.querySelectorAll("input").forEach(function (input) {
	["keyup", "change"].forEach(function (event) {
		input.addEventListener(event, render);
	});
});

document.addEventListener("clipboard-copy", function (event) {
	console.log(event);
	event.target.classList.add("success");

	setTimeout(function () {
		event.target.classList.remove("success");
	}, 5000);
});
