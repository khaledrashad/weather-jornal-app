const apiKey = 'd5b3926b2fdb43abb23d3c3803f1cc28&units=imperial';
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?`
const postData = async (url='', data= {}) => {
    
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),        
      });
    
        try {
          const newData = await response.json();
          return newData;
        }catch(error) {
        console.log("error", error);
        }
};
const retrieveData = async (url='') =>{ 
    const request = await fetch(url);
    try {
    const allData = await request.json()
    return allData
    }
    catch(error) {
        console.log("error", error);
    }
};

const addData = () => {
    const zipCode = document.getElementById('zip').value
    retrieveData(baseUrl+"zip="+zipCode+"&appid="+apiKey).then((data)=>{
        postData('http://127.0.0.1:3000/projects', {
            temp: data.main.temp,
            date: data.dt,
            userResponse: document.getElementById('feelings').value
        }).then((_)=>{
            retrieveData('http://127.0.0.1:3000/project').then((projectData)=>{
                
                document.getElementById('temp').innerHTML=Math.round(projectData.temp)+ 'degrees'
                document.getElementById('date').innerHTML=date(projectData.date)
                document.getElementById('content').innerHTML=projectData.userResponse

            })
        })
    })
}

document.getElementById('generate').addEventListener('click', addData)
const date = (date) => {
    date = new Date(date * 1000);
    date = date.toLocaleDateString("en-US")
    return date
}