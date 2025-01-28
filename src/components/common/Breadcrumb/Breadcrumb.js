import React from 'react';

const Breadcrumb = ({ items }) => {
    console.log(items,"-sdfs------")
  return (
    <ul className="flex items-center space-x-4 absolute top-[9px] left-[15px] sm:left-[40px]">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <li
            className={`text-sm ${item.active ? 'text-white font-[300]' : 'text-[#FEE4D0] font-[600]'} cursor-pointer`}
          >
            {item.link ? (
              <a className='hover:!text-[#FEE4D0] !no-underline' href={item.link}>{item.label}</a>
            ) : (
              item.label
            )}
          </li>
          {index < items.length - 1 && (
            <li className="text-white">/</li>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default Breadcrumb;
