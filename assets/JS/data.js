let bar = $("#myChart")
let circle = $("#myChartDounut")
let line = $("#myChartLine")
let barObject;
let circleObject;
let lineObject;
let startData=[
    {
        "id": 5,
        "customer_id": 2,
        "date": "2022-01-02",
        "amount": 1300
        },
        {
        "id": 6,
        "customer_id": 4,
        "date": "2022-01-01",
        "amount": 750
        },
    
]

function display(data){
    
    if(barObject){
        barObject.destroy()
    }
    if(circleObject){
        circleObject.destroy()
    }
    if(lineObject){
        lineObject.destroy()
    }
    barObject=new Chart(bar, {
        type: 'bar',
        data: {
            labels: data.map(barObject=>barObject.date),
            datasets: [{
                label: '# of Votes',
                data:data.map(barObject=>barObject.amount),
                borderWidth: 1
            }]
        },
        options: {
    
    
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            maintainAspectRatio: false
        }
    });
    
    circleObject=new Chart(circle, {
        type: 'doughnut',
        data: {
            labels:data.map(circleObject=>circleObject.date),
            datasets: [{
                label: '# of Votes',
                data: data.map(circleObject=>circleObject.amount),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    display: false, 
                    grid: {
                        display: false 
                    }
                },
                x: {
                    display: false,
                    grid: {
                        display: false
                    }
                }
            },
            maintainAspectRatio: false
        }
    });
    lineObject=new Chart(line, {
        type: 'line',
        data: {
            labels: data.map(lineObject=>lineObject.date),
            datasets: [{
                label: '# of Votes',
                data: data.map(lineObject=>lineObject.amount),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            maintainAspectRatio: false
        }
    });
   
}

async function showData(){
    let customerInfo = await fetch("http://localhost:5500/customers")
    let finalData= await customerInfo.json()
    let cName=finalData.map(elemnt=>elemnt.name);

    let transactiom = await fetch("http://localhost:5500/transactions")
    let finalTrans= await  transactiom.json()
    finalTrans.forEach(elemnt=>{
        elemnt["name"]=cName[elemnt.customer_id-1]
    })

    
    dispalayTable(finalTrans)
    getAmount(finalTrans)
    
}

function dispalayTable(data){
    data.forEach(elemnt=>{
        $("tbody").append(`<tr class="tr-${elemnt.id} text-center pointer py-2"></tr>`)
    $(`.tr-${elemnt.id}`).append(`<td class="py-2">${elemnt.id}</td>`)
    $(`.tr-${elemnt.id}`).append(`<td class="name py-2">${elemnt.name}</td>`)
    $(`.tr-${elemnt.id}`).append(`<td class="py-2">${elemnt.date}</td>`)
    $(`.tr-${elemnt.id}`).append(`<td class="py-2">${elemnt.amount}</td>`)
    })
    
}


function getAmount(data){
    $("tr").click(function(){
        $("tbody").empty()
        let selectedName=$(this).find(".name").html();
        let filterdData=data.filter(item=>item.name==selectedName);
        dispalayTable(filterdData)
        display(filterdData)
    
    })
}
showData()

$(".fa-refresh").click(function(){
    $("tbody").empty()
    showData()
})


display(startData)