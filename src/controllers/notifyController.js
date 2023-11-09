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
export default {
  handleGetNotify,
};
