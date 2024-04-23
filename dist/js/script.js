alert('OK')

function searchMovies(search) {
   $.ajax({
      url: 'http://www.omdbapi.com',
      type: 'get',                                                      // methodnya
      dataType: 'json',                                                 // returnnya mau bentuk apa
      data: {
         'apikey': '57d0c8d6',
         's': search
      },
      success: function(result) {
         if(result.Response == 'True'){                                 // 'True' string, karna value Responsenya juga string, bukan boolean
            let movies = result.Search

            $('.card-wrapper').html('')

            $.each(movies, function(i, movie) {
               $('.card-wrapper').append(`
               <div class="card" data-id="`+ movie.imdbID +`" style="background-image:url(`+ movie.Poster +`)">
                  <div class="card-type capitalize">`+ movie.Type +`</div>
                  <div class="card-title">
                     <div class="pb-3">
                        <h3 class="w-full">`+ movie.Title +`</h3>
                        <h3>`+ movie.Year +`</h3>
                     </div>
                  </div>
               </div>
               `)
            })

         } else {
            $('.card-wrapper').html(`<h1 class="text-slate-300">` + result.Error +`</h1>`)
         }
      }
   })
}

function showModalBox(id) {
   $('#modal-box').removeClass('hidden')
   $('#modal-left').html('')            
   $('#modal-right').html('')
   
   $.ajax({
      url: 'http://www.omdbapi.com',
      type: 'get',
      dataType: 'json',
      data: {
         'apikey': '57d0c8d6',
         'i': id
      },
      success: (result) => {
         if(result.Response == 'True') {
            $('#modal-left').html(`
               <img src="`+ result.Poster +`" alt="image not found" class="w-full h-full">
            `)

            $('#modal-right').html(`
               <div class="py-8">
                  <div class="modal-bg" 
                  style="background-image: url('`+ result.Poster +`');">
                  </div>
                  
                  <div class="modal-duration">
                     <img src="./public/img/clock2.png" class="md:opacity-10 w-full h-full">

                     <div class="absolute top-0 flex justify-center items-center w-full h-full">
                        <h3 class="text-yellow-500 text-xs font-extrabold">`+ result.Runtime +`</h3>
                     </div>
                  </div>

                  <div class="modal-rating">
                     <span>
                        <svg class="w-5 md:w-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.8115 6.72682C12.8248 4.90902 13.3315 4.00012 14.089 4.00012C14.8465 4.00012 15.3531 4.90902 16.3665 6.72682L16.6286 7.19711C16.9166 7.71367 17.0605 7.97195 17.285 8.14237C17.5095 8.31278 17.7891 8.37604 18.3483 8.50256L18.8574 8.61774C20.8251 9.06297 21.809 9.28558 22.0431 10.0383C22.2771 10.791 21.6064 11.5754 20.2649 13.1441L19.9179 13.5499C19.5366 13.9957 19.346 14.2186 19.2603 14.4943C19.1746 14.77 19.2034 15.0674 19.261 15.6622L19.3135 16.2036C19.5163 18.2966 19.6177 19.3431 19.0049 19.8083C18.392 20.2735 17.4708 19.8494 15.6285 19.0011L15.1518 18.7816C14.6282 18.5405 14.3665 18.42 14.089 18.42C13.8115 18.42 13.5497 18.5405 13.0262 18.7816L12.5495 19.0011C10.7071 19.8494 9.78593 20.2735 9.17311 19.8083C8.56029 19.3431 8.66169 18.2966 8.86451 16.2036L8.91698 15.6622C8.97461 15.0674 9.00343 14.77 8.91768 14.4943C8.83193 14.2186 8.64133 13.9957 8.26012 13.5499L7.91307 13.1441C6.57159 11.5754 5.90085 10.791 6.13492 10.0383C6.369 9.28558 7.35287 9.06297 9.32062 8.61774L9.8297 8.50256C10.3889 8.37604 10.6685 8.31278 10.8929 8.14237C11.1174 7.97195 11.2614 7.71367 11.5494 7.19711L11.8115 6.72682Z" fill="#1C274C"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.74549 5.20241C6.76387 4.63138 4.63821 4.933 2.58729 6.13407L2.37913 6.25598C2.0217 6.4653 1.56226 6.34523 1.35293 5.9878C1.14361 5.63037 1.26368 5.17092 1.62111 4.9616L1.82927 4.8397C4.18969 3.45737 6.73702 3.0626 9.16083 3.76106L9.36871 3.82096C9.76673 3.93566 9.99641 4.35129 9.88171 4.74931C9.76702 5.14733 9.35139 5.37701 8.95337 5.26231L8.74549 5.20241ZM4.83628 9.93646C4.87144 10.3492 4.56537 10.7123 4.15265 10.7474C3.99949 10.7605 3.88206 10.7679 3.78365 10.7742C3.60627 10.7854 3.49069 10.7928 3.33902 10.8219C3.14253 10.8596 2.8874 10.9394 2.4244 11.1709C2.05391 11.3562 1.60341 11.206 1.41817 10.8355C1.23293 10.465 1.38309 10.0145 1.75358 9.8293C2.29057 9.5608 2.68032 9.42092 3.05627 9.34876C3.30317 9.30137 3.55804 9.28477 3.78724 9.26984C3.87053 9.26441 3.95043 9.25921 4.02533 9.25283C4.43804 9.21767 4.80112 9.52374 4.83628 9.93646ZM5.91788 15.8561C4.73392 15.5786 3.48653 15.8538 2.55316 16.5892C2.22781 16.8456 1.75624 16.7896 1.49988 16.4643C1.24353 16.1389 1.29946 15.6674 1.62482 15.411C2.92261 14.3884 4.63911 14.0158 6.2601 14.3956C6.66339 14.4901 6.91371 14.8937 6.81921 15.297C6.72471 15.7003 6.32117 15.9506 5.91788 15.8561Z" fill="#1C274C"></path> </g></svg>
                     </span> 
                     <span id="imdbRating" class="font-bold">`+ result.imdbRating +`</span>
                  </div>

                  <div class="modal-header">
                  <h1 class="modal-title">`+ result.Title +`</h1>
                     <h4 id="rated">`+ result.Rated +`</h4>
                     <h4 id="type" class="capitalize">`+ result.Type +`</h4>
                     <h4 id="year">`+ result.Year +`</h4>
                  </div>
               </div>

               <div class="modal-body">
                  <h3 id="genre">`+ result.Genre +`</h3>
                  <h3 id="plot" class="italic text-secondary">"`+ result.Plot +`"</h3>
                  <h3>Writer - 
                     <span id="writer">`+ result.Writer +`</span>
                  </h3>
                  <h3>Stars - 
                     <span id="actors">`+ result.Actors +`</span>
                  </h3>
               </div>

               <div class="absolute bottom-12 left-0 flex justify-center w-full">
                  <button class="modal-close-btn">close</button>
               </div>
            `)
         }
      }
   })
}

// Query movies saat home page diload
searchMovies('puss')

$('#cards').on('click', '.card', function() {
   showModalBox($(this).data('id'))
})

// Movies by search
$('#search-input').on('change', function() {   
   searchMovies($(this).val())

   $('#cards').on('click', '.card', function() {
      showModalBox($(this).data('id'))
   })
})


// Mengatasi event bubbling, target ke parent-nya biar codenya jalan terus (ga di awal load aja). karna element card digeneratenya nanti kalo udah disearch
$('#cards .container').on('click', '.modal-close-btn', () => {
   $('#modal-box').addClass('hidden')
})


// For testing Card, biar ga abisin quota api
$('.card').on('click', () => {
   $('#modal-box').removeClass('hidden')
})

$('.modal-close-btn').on('click', () => {
   $('#modal-box').addClass('hidden')
})