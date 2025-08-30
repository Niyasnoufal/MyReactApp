

const Table = () => {
  return (
    <div className="flex justify-center items-center">   
         <table className="w-[300px] h-full">
        <thead className="bg-black text-white">
            <tr className="flex justify-around">
                <th >S.no</th>
                <th>Name</th> 
                <th>Age</th>
            </tr>
        </thead>
            <tbody className=" bg-green-200 text-black text-sm border border-black">
                <tr className="flex justify-around border-b-2 border-black py-2">
                    <td>1</td>
                    <td>Niyas</td>
                    <td>25</td>
                </tr>
                <tr className="flex justify-around border-b-2 border-black py-2">
                    <td>2</td>
                    <td>Basith</td>
                    <td>21</td>
                </tr>
                <tr className="flex justify-around border-b-2 border-black py-2">
                    <td>3</td>
                    <td>Jasim</td>
                    <td>20</td>
                </tr>
                <tr className="flex justify-around border-b-2 border-black py-2">
                    <td>4</td>
                    <td>Shifana</td>
                    <td>13</td>
                </tr>
            </tbody>
        
    </table>
    </div>
   
  )
}

export default Table
