import { FC, useCallback } from "react";
import { IconType } from "react-icons"
import queryString from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

interface CategoryProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryBox: FC<CategoryProps> = ({
  label,
  icon: Icon,
  selected
}) => {

  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};
    // console.log(queryString.parse(params.toString()))

    if (params) {
      currentQuery = queryString.parse(params.toString())
    }
    
    let updatedCategory = {
      ...currentQuery,
      category: label
    }

    if (params?.get('category') === label && updatedCategory.category) {
      delete updatedCategory.category
    }

    const url = queryString.stringifyUrl({
      url: '/',
      query: updatedCategory
    }, { skipNull: true });

    router.push(url);

  }, [label, router, params])


  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}>
      <Icon size={26} />
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
  )
}

export default CategoryBox
