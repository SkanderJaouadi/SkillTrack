export default function Card({item}){
    return <>
        <div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
            <div class="p-6">
                    {item}
            </div>
        </div> 
    </>
}