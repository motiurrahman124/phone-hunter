const loadPhones = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log('data', data);
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAll = document.getElementById('show-all');

        if(dataLimit && phones.length>8)
        {
            phones = phones.slice(0,8);
            showAll.classList.remove('hidden');
        }else{
            showAll.classList.add('hidden');
        }

    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0)
    {
        noPhone.classList.remove('hidden');
    }
    else{
        noPhone.classList.add('hidden');

    }
    phones.forEach(phone =>{
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('card');
        phoneDiv.classList.add('bg-cyan-100');
        phoneDiv.classList.add('shadow-xl');
        phoneDiv.innerHTML = `
        <figure class="pt-10">
            <img class="w-[200px] h-[250px]" src="${phone?.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone?.phone_name}</h2>
            <p>If a car chews shoes whose shoes does he choose?</p>
            <div class="card-actions">
                <label onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" for="my-modal-3">Phone Details</label>
            </div>
        </div>`;
        phoneContainer.appendChild(phoneDiv);
    });
    toggleLoader(false);
    
}

const processSearch = (dataLimit) =>{
    toggleLoader(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click',function(){
    processSearch(8);
})

document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key == 'Enter'){
        processSearch(8);
    }
})

const toggleLoader = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading)
    {
        loaderSection.classList.remove('hidden');
    }
    else{
        loaderSection.classList.add('hidden');
    }
}

document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})

loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
    
    const modalTitle = document.getElementById('phone-title');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p class="py-4">Relase Date: ${phone.releaseDate? phone.releaseDate: "No Release Date Found"}</p>`
}


