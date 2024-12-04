import { useSelector } from "react-redux";

const PermissionUtils=()=>{
    const user = useSelector((state) => state.user);
    const isAllow=(key)=>{
        let value=false
        let permissions=user.subRoleDetails?.permissions
        if(permissions?.[key]) value=true
        if(!user?.subRole) value=true
        return value
      }

    return {
        isAllow
    }
}


export default PermissionUtils