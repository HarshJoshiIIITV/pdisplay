import React, {Component} from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
	constructor() {
		super();
		this.state = {
        register: false,
        title:null,
        description:null,
        image:null,
        queue:[],
        show_more:false,
        show_more_data:false,
		};
  }

	changeRoute = (id, entries) => {
		this.setState({
			id: id,
			entries,
		});
  };
  
  toggle_register=()=>{
    this.setState({
      register:!this.state.register
    });
  }
  onchange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  onsubmit=()=>{

    const curr_state={title:this.state.title,description:this.state.description,image:this.state.image}
    if(curr_state.title==null || curr_state.description==null || curr_state.image==null)
      return;
      axios.post('https://boiling-plateau-31660.herokuapp.com/data',
      curr_state
          )
          .then((resp) => {
      this.get_data()
          })
          .catch((err) => {
            console.log(err);
          });
    if(this.state.queue.length>=6){
      this.setState({
        show_more:true
      })
    }
  }

  submit_less=()=>{
    const arr=this.state.queue;
    const first_six=arr.slice(0,6);
    return first_six;
  }

  show_more=()=>{
    const arr=this.state.queue;
    const last=arr.slice(6);
    return last;
  }

  toggle_showmore=()=>{
    if(this.state.queue.length>6){
      this.setState({
        show_more_data:!this.state.show_more_data
      })
      
    }
  }
  componentDidMount(){
    this.get_data();
    setInterval(()=>{ 
      if(this.state.queue.length<=6){
        this.setState({
          show_more:false
        })
        return;
      }
      var queue_copy=null;
      queue_copy=this.state.queue;
      if(queue_copy!=null){
        queue_copy.shift();
      }
      this.setState({
        queue:queue_copy
      }); 
  }, 30000);
}

  get_data=()=>{
    axios.get('https://boiling-plateau-31660.herokuapp.com/').then((resp)=>{
      this.setState({
        queue:resp.data
      })  
      console.log(resp.data);
    }).then(()=>{
      if(this.state.queue.length>=6){
        this.setState({
          show_more:true
        })
      }
    })
  }

  reset=()=>{
    document.getElementById("inputfield1").value="";
    document.getElementById("inputfield2").value="";
    document.getElementById("inputfield3").value="";
    this.setState({
      title:null,
      description:null,
      image:null
    })
  }
  
	render() {  
    // this.two();
		return (
			<div className='App'>
        <h1 style={{textAlign:'center'}}>PRODUCT  DISPLAY MENU</h1>
        <p style={{margin:"0",textAlign:'right',color:'white',margin:'10px',textDecoration:'underline'}}>Developed by Harsh Joshi</p>
       <div style={{display:"flex",flexWrap:'wrap',justifyContent:'left'}}>
          {this.state.register ? (
					<div className="form"> 
            <div>
            <label >Title</label>
            <input required onChange={this.onchange} id="inputfield1" type="text" name="title"/>  
            </div>
            <div>
            <label >Description</label>
            <input required onChange={this.onchange} id="inputfield2" type="text" name="description"/>
            </div>
            <div>
            <label >ImageURL</label>
            <input required onChange={this.onchange} id="inputfield3" type="text" name="image"/>
            </div>
            <button className="button_form" style={{padding:'5px 10px'}} onClick={this.onsubmit}>Submit</button>
            <button className="button_form" style={{padding:'5px 10px'}} onClick={this.reset}>Reset</button>
          </div>
				) :null
        }
        <div>
        {
          this.state.register?<button className="button_window"  style={{margin:"20px",outlineColor:'white'}} onClick={this.toggle_register}>Close Registration form</button>
          :<button style={{margin:"20px",outlineColor:'white'}} className="button_window" onClick={this.toggle_register}>Open Registration Form</button>
        }

        </div>
         
       </div>
        
        
        <div className="cards">
        {this.state.queue.length ?
					this.submit_less().map((response, i) => {
            return(
            <div className="card" key={response.id}>
              <img src={response.image_db} width="50%" height="50%" />
              <h4 style={{textAlign:"center",borderBottom:'0.5px solid black'}}>{response.title_db}</h4>
              <p style={{textAlign:"left"}}>{response.description_db}</p>
            </div>
            )
          }):null}
        
        {this.state.queue.length && this.state.show_more_data ?
					this.show_more().map((response, i) => {
            return(
            <div className="card" key={response.id}>
              <img src={response.image_db} width="50%" height="50%" />
              <h4 style={{textAlign:"center",borderBottom:'0.5px solid black'}}>{response.title_db}</h4>
              <p style={{textAlign:"center"}}>{response.description_db}</p>
            </div>
            )
          }):null}
        </div>
        {this.state.show_more && !this.state.show_more_data? <button style={{display:'block',margin:'5px auto',marginBottom:'30px'}} className="button_window" onClick={this.toggle_showmore}>Show more ({this.state.queue.length-6})</button>:null}
      {this.state.show_more_data  && this.state.show_more? <button  onClick={this.toggle_showmore} style={{display:'block',margin:'10px auto',marginBottom:'30px'}} className="button_window">Show Less</button>:null}
			</div>
		);
	}
}

export default App;
