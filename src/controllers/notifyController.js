import notifyService from "../services/NotifyService";
const handleGetNotify = async (req, res) => {
    const data = req.params;
    if(data && data.id){
        const reg = await notifyService.handleGetNotifyService(data.id);
        // console.log(reg);
        return res.status(200).json({
            reg
        })
    }else{
        return res.status(400).json({
            EC:5,
            EM : "MISSING DATA",
        })
    }

    // console.log(data);
  
    
};

const handleReadNotify = async (req,res)=>{
    const data = req.params;
    // console.log(data);
    if(data && data.id){
        // console.log("Here");
        const reg = await notifyService.handleReadNotifyService(data.id);
        return res.status(200).json({
            reg
        })
    }else{
        return res.status(400).json({
            EC:5,
            EM : "MISSING DATA",
        })
    }

};
const handleNumberNoReadNotify = async (req, res) => {
    const data = req.params;
    if(data && data.id){
        const reg = await notifyService.handleNumberNoReadNotifyService(data.id);
        // console.log(reg);
        return res.status(200).json({
            reg
        })
    }else{
        return res.status(400).json({
            EC:5,
            EM : "MISSING DATA",
        })
    }

    // console.log(data);
  
    
};
export default {
  handleGetNotify,
  handleReadNotify,
  handleNumberNoReadNotify
};
