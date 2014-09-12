(function (OgvAd) {
	'use strict';
	var Main = (function() {

		var exibindo = null;

		function init() {
			document.querySelector('.icone-city').addEventListener('click', iconeCity, false);
			document.querySelector('.icone-tracao').addEventListener('click', iconeTracao, false);
			document.querySelector('.icone-painel').addEventListener('click', iconePainel, false);
			document.querySelector('.icone-teto').addEventListener('click', iconeTeto, false);
			document.querySelector('.icone-design').addEventListener('click', iconeDesign, false);
			document.querySelector('.icone-assentos').addEventListener('click', iconeAssentos, false);
			document.querySelector('.icone-rodas').addEventListener('click', iconeRodas, false);

			document.querySelector('.botao-clique').addEventListener('click', botaoClique, false);
			document.querySelector('.botao-agende').addEventListener('click', botaoAgende, false);
			document.querySelector('.link-facebook').addEventListener('click', linkFacebook, false);
			document.querySelector('.link-saiba-mais').addEventListener('click', linkSite, false);
		}

		// Ícones:
		function iconeCity () {
			escondeUltimo();
			mostraAtual('city');
		}

		function iconeTracao () {
			escondeUltimo();
			mostraAtual('tracao');
		}

		function iconePainel () {
			escondeUltimo();
			mostraAtual('painel');
		}

		function iconeTeto () {
			escondeUltimo();
			mostraAtual('teto');
		}

		function iconeDesign () {
			escondeUltimo();
			mostraAtual('design');
		}

		function iconeAssentos () {
			escondeUltimo();
			mostraAtual('assentos');
		}

		function iconeRodas () {
			escondeUltimo();
			mostraAtual('rodas');
		}
		// Ícones.

		// Esconde e mostra os itens:
		function escondeUltimo () {
			if (exibindo !== null) {
				document.querySelector('.icone-' + exibindo).setAttribute('src', 'img/icone.png');
				document.querySelector('.titulo-' + exibindo).classList.remove('show');
				document.querySelector('.info-' + exibindo).classList.remove('show');
			}
		}

		function mostraAtual (atual) {
			document.querySelector('.icone-' + atual).setAttribute('src', 'img/icone_ativo.png');
			document.querySelector('.titulo-' + atual).classList.add('show');
			document.querySelector('.info-' + atual).classList.add('show');

			exibindo = atual;
		}
		// Esconde e mostra os itens.

		// Botões:
		function botaoClique () {
			window.open('http://www.volvocars.com/br/all-cars/volvo-v40-cross-country/pages/default.aspx');
		}

		function botaoAgende () {
			window.open('http://www.volvocars.com/br/all-cars/volvo-v40-cross-country/tools/pages/agende-test-drive.aspx');
		}
		// Botões.

		// Link - Facebook:
		function linkFacebook () {
			window.open('https://www.facebook.com/VolvoCarsBR');
		}
		// Link - Facebook.

		// Link - Site:
		function linkSite () {
			window.open('http://www.volvocars.com.br/');
		}
		// Link - Site.

		return {
			init: init
		};
	}());
	OgvAd.Main = Main;
	window.addEventListener('load', OgvAd.Main.init);
}(window.OgvAd = window.OgvAd || {}));
