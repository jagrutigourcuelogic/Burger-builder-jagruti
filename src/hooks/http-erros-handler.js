import { useEffect , useState  } from "react";


export default httpClient  => {

    const [error , setError] = useState(null);
        


   
    const  reqInterceptor =  httpClient.interceptors.request.use(request => {
            setError(null);
            return request;
        });
  const  resInterceptor =    httpClient.interceptors.response.use(res=>res,error =>{
            setError(error);
        });

        useEffect(()=>{
            return () => {
                httpClient.interceptors.request.eject( reqInterceptor);
                httpClient.interceptors.response.eject( resInterceptor);

            };
        },[reqInterceptor,resInterceptor]);

 const   errorConfirmedHadler = () => {
        setError(null);
    };

    return [error , errorConfirmedHadler];
}