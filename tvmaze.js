"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");

const SEARCH_WEBSITE = "http://api.tvmaze.com/search/shows";
const DEFAULT_IMAGE = "https://store-images.s-microsoft.com/image/apps.65316.13510798887490672.6e1ebb25-96c8-4504-b714-1f7cbca3c5ad.f9514a23-1eb8-4916-a18e-99b1a9817d15?mode=scale&q=90&h=300&w=300"


 function getShowId(showData){
  // let showData = await getShowsByTerm();
  let showId = showData.show.id;
  return showId;
}

 function getShowName(showData){
  // let showData = await getShowsByTerm();
  let showName = showData.show.name;
  return showName;
}

 function getShowSummary(showData){
  // let showData = await getShowsByTerm();
  let showSummary = showData.show.summary;
  return showSummary;
}
 function getShowImage(showData){
  // let showData = await getShowsByTerm();
  let showImage;

  if (showData.show.image === null){
        showImage = DEFAULT_IMAGE
      }
      else{
        showImage = showData.show.image.medium
      }
  return showImage;
}

 function createObjectFromShow(show){
  let showSummary = getShowSummary(show);
  let showImage = getShowImage(show);
  let showName = getShowName(show);
  let showId = getShowId(show);

  return {id: showId,name: showName, summary: showSummary,image: showImage};
}

 function createArrayOfObjects(shows){
  let showsData = shows.data;
  let arrayOfShowData = [];

  for(let show of showsData){
    let showObject = createObjectFromShow(show)
    arrayOfShowData.push(showObject);
  }

  return arrayOfShowData;
}







/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(searchTerm) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  console.log("get shows by term: ", "this ran");
  let response = await axios.get(SEARCH_WEBSITE, {params:{q:searchTerm}});
  return response;


  // let shows = response.data
  // for (let showObj of shows){
  //   let showInfo = {}
  //   showInfo.id = showObj.show.id;
  //   showInfo.name = showObj.show.name;
  //   showInfo.summary = showObj.show.summary;
  //   if (showObj.show.image === null){
  //     showInfo.image = DEFAULT_IMAGE
  //   }
  //   else{
  //     showInfo.image = showObj.show.image.medium
  //   }
  //   arrayOfShowData.push(showInfo)
  // }
  // // console.log("this is our response:",response);
  // // console.log(typeof response);
  // // console.log("this is respnse.data", response.data)
  // // console.log(typeof response.data)
  // // console.log("this is our array of shows", arrayOfShowData)



  // return [
  //   {
  //     id: 1767,
  //     name: "The Bletchley Circle",
  //     summary:
  //       `<p><b>The Bletchley Circle</b> follows the journey of four ordinary 
  //          women with extraordinary skills that helped to end World War II.</p>
  //        <p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their 
  //          normal lives, modestly setting aside the part they played in 
  //          producing crucial intelligence, which helped the Allies to victory 
  //          and shortened the war. When Susan discovers a hidden code behind an
  //          unsolved murder she is met by skepticism from the police. She 
  //          quickly realises she can only begin to crack the murders and bring
  //          the culprit to justice with her former friends.</p>`,
  //     image:
  //         "http://static.tvmaze.com/uploads/images/medium_portrait/147/369403.jpg"
  //   }
  // ]
}


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
        `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img 
              src="http://static.tvmaze.com/uploads/images/medium_portrait/160/401704.jpg" 
              alt="Bletchly Circle San Francisco" 
              class="w-25 mr-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `);

    $showsList.append($show);  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);
  
  let showArray = createArrayOfObjects(shows);
  console.log(showArray);


  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

// async function getEpisodesOfShow(id) { }

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }
