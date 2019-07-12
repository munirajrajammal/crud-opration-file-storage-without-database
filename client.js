$(document).ready(function(){
    function getResultOnLoad(){
        $.get('http://localhost:4000',function(data){
            console.log(data);
            data = JSON.parse(data);
            var tr;
            $("#teabody tr").remove();

            for(var i=0;i<data.length;i++){

                tr =$('<tr/>');
                tr.append("<td>"+data[i].id+"</td>");
                tr.append("<td>"+data[i].name+"</td>");
                tr.append("<td>"+data[i].age+"</td>");
                tr.append("<td>"+data[i].email+"</td>");
                
                $('table').append(tr);
                
            }
        });
        $("table").on('click','tr',function(){
            temp=$(this).find('td')
            $('#id').val($(temp[0]).text())
            $('#name').val($(temp[1]).text())
            $('#age').val($(temp[2]).text())
            $('#email').val($(temp[3]).text())
        })
    }
    $('#create').on('click',function(event){
        data={
            name:$('#name').val(),
            age:$('#age').val(),
            email:$('#email').val()
        }
        js=JSON.stringify(data);
        $.ajax({
            type:"post",
            url:"http://localhost:4000/create",
            data:js
        }).done(function(msg){
            console.log(msg);
            getResultOnLoad();
            return false;
        })
    })
    $('#update').on('click',function(event){
        data={
            id:$('#id').val(),
            name:$('#name').val(),
            age:$('#age').val(),
            email:$('#email').val()
        }
        js=JSON.stringify(data);
        $.ajax({
            type:"post",
            url:"http://localhost:4000/update",
            data:js
        }).done(function(msg){
            console.log(msg);
            getResultOnLoad();
            return false;
        })
    })
    $('#delete').on('click',function(event){
        data={
            id:$("#id").val(),
            name:$('#name').val(),
            age:$('#age').val(),
            email:$('#email').val()
        }
        js=JSON.stringify(data);
        $.ajax({
            type:"post",
            url:"http://localhost:4000/delete",
            data:js
        }).done(function(msg){
            console.log(msg);
            getResultOnLoad();
            return false;
          
        })
        
    }) 
    getResultOnLoad();
})
