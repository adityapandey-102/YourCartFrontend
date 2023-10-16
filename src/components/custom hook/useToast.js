import { toast } from 'react-toastify'


const useToast=()=>{
    const showToast = (message, type = 'info') => {
        const properties={
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        }
        toast[type](message, properties)
      };
    return showToast;
}
export default useToast;