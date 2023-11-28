import React, { ReactNode, PropsWithChildren } from 'react'

type Column = string[][];

type masonryProps = {
  children: ReactNode
}

const MasonryComponent: React.FC<masonryProps> = ({children}) => {
        let columns: Column;

        const [columnCount, setColumnCount] = React.useState(() => window.innerWidth <700 ? (window.innerWidth < 350 ? 1 : 2) : 3)

        React.useEffect(()=> {
            window.addEventListener('resize', checkWidth)
          
            return () => {
              window.removeEventListener('resize', checkWidth)
            }
        }, [])

        function checkWidth() {
        let width = window.innerWidth;

        if(width < 350) {
            setColumnCount(1) 
        }
        else if(width < 700) {
            setColumnCount(2) 
        }
        else {
            setColumnCount(3)
        }
        }

      columns = Array.from({length: columnCount}, () => [])
        

      React.Children.forEach(children, (child: ReactNode, index: number) => {
        if (React.isValidElement(child)) {
          columns[index%columnCount].push(child);
        }
      })

  
  
  return (
    <div className='flex flex-row justify-content-center width-100 box-sizing-border-box align-content-stretch  gap-x-4 relative'>
      {
      columns.map((column, i) => (
        <div key={i} className='flex flex-col justify-content-flex-start align-content-stretch flex-grow width-0 gap-y-3 relative'>
          {column.map(item => item)}
        </div>
      ))}
    </div>
  )
}

export default MasonryComponent;