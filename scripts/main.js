var films;
var cont;
var api;

$('input').keydown(function(){
	$('.films').empty();
});
$('input').keyup(function(){
	api = `https://www.omdbapi.com/?i&s=${$('input').val()}`;

	$(".preloader").css({
				"border": "8px solid #f3f3f3",
				"border-radius": "50%",
				"border-top": "8px solid #3498db",
				"width": "50px",
				"height": "50px",
				"-webkit-animation": "spin 2s linear infinite",
				"animation": "spin 2s linear infinite",
				"margin":"auto",
				"margin-bottom": "20px"
	});
	setTimeout(showPage, 3000);
	
	function showPage() {
		$(".preloader").removeAttr("style");
	}

	$.getJSON(api,function (data){
		films=data.totalResults;
		$.each(data.Search, function(index, value){
			if(value.Poster === "N/A" || 
				value.Poster[4] === ":"){
				value.Poster="images/noDisponible.png";
			}

			$('.films').append(
				$('<a>',{
					class:"card col-lg-3",
					href:`https://www.imdb.com/title/${value.imdbID}`,
					target:"_blank",
				}).append(
					$("<img>",{
						class:"col-lg-12",
						src:value.Poster,
						alt:value.Title,
					}).attr("size","cover"),
					// $('<span>',{class:"img"}),
					$('<div>',{class:"container2"}).append(
						$("<h4>").append(
							$("<b>", {text:value.Title})
						),
						$('<p>', {text:value.imdbRating}),
						$('<p>', {text:value.Year})
					)
				)
			);
		});
		if(data.Error==="Movie not found!"){
			$('.match').html(data.Error);
		}else{
			$('.match').html("");
		}
	});
	cont=1;
});



$(window).scroll(function() {
	if($(window).scrollTop() + $(window).height() == getDocHeight()) {
		cont++;

		if(cont<=(Math.ceil(films/10))){
			
			
			$(".preloader").css({
				"border": "8px solid #f3f3f3",
				"border-radius": "50%",
				"border-top": "8px solid #3498db",
				"width": "50px",
				"height": "50px",
				"-webkit-animation": "spin 2s linear infinite",
				"animation": "spin 2s linear infinite",
				"margin":"auto",
				"margin-bottom": "20px"
			});
			setTimeout(showPage, 3000);
			
			function showPage() {
				$(".preloader").removeAttr("style");
			}



			$.getJSON(api+`&page=${cont}`,function (data){
				$.each(data.Search, function(index, value){
					if(value.Poster === "N/A" || 
						value.Poster[4] === ":"){
						value.Poster="images/noDisponible.png";
					}
					$('.films').append(
						$('<a>',{
							class:"card col-lg-3",
							href:`https://www.imdb.com/title/${value.imdbID}`,
							target:"_blank",
						}).append(
							$("<img>",{
								class:"col-lg-12",
								src:value.Poster,
								alt:value.Title,
							}).attr("size","cover"),
							// $('<span>',{class:"img"}),
							$('<div>',{class:"container2"}).append(
								$("<h4>").append(
									$("<b>", {text:value.Title})
								),
								$('<p>', {text:value.imdbRating}),
								$('<p>', {text:value.Year})
							)
						)
					);
				});
			});
			
		}
	}
});

function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}


