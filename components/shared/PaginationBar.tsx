import { ArrowLeft, ArrowRight } from "lucide-react";
import { ButtonColor, CustomButton } from "./CustomButton";

export default function PaginationBar({
    pageIndex = 0,
    totalPageCount = 0,
    maxPageShown = 3,
    height = "h-10",
    onSelectPage = (index: number) => { },
    onPreviousPage = () => { },
    onNextPage = () => { }
}

) {
    let middlePartStart = Math.max(pageIndex - Math.floor((maxPageShown - 2) / 2), 1);
    let middlePartEnd = Math.min(middlePartStart + maxPageShown - 3, totalPageCount - 2);
    middlePartStart = Math.max(middlePartEnd - (maxPageShown - 2) + 1, 1)
    //console.log("Total page: ", totalPageCount, " current page: ", pageIndex, " start: ", middlePartStart, " end: ", middlePartEnd)

    return (
        <div className={"w-fit flex flex-row justify-end items-center gap-2 " + height}>
            <CustomButton
                color={ButtonColor.PURPLE}
                width='w-30'
                height='h-10'
                rounded='rounded-full'
                onClick={(event) => onPreviousPage()}
                enabled={pageIndex > 0}
            >
                <ArrowLeft className='text-white' />
                Previous
            </CustomButton>
            <CustomButton
                text="0"
                color={pageIndex === 0 ? ButtonColor.PURPLE : ButtonColor.WHITE}
                onClick={(event) => onSelectPage(0)}
                width='w-10'
                height='h-10'
                rounded='rounded-full'
            />
            {
                middlePartStart > 1 &&
                <CustomButton
                    text="..."
                    color={ButtonColor.WHITE}
                    width='w-10'
                    height='h-10'
                    rounded='rounded-full'
                    enabled={false}

                />
            }
            {
                (middlePartEnd - middlePartStart + 1 > 0) && [...Array(middlePartEnd - middlePartStart + 1)].map((_, index) => {
                    if (index === 0 && middlePartStart > 1) {
                        <CustomButton
                            key={index}
                            text={(middlePartStart + index).toString()}
                            color={ButtonColor.WHITE}
                            enabled={false}
                            width='w-10'
                            height='h-10'
                            rounded='rounded-full'
                        />
                    }
                    else if (index === middlePartEnd - middlePartStart && middlePartEnd < totalPageCount - 2) {
                        <CustomButton
                            key={index}
                            text={(middlePartStart + index).toString()}
                            color={ButtonColor.WHITE}
                            enabled={false}
                            width='w-10'
                            height='h-10'
                            rounded='rounded-full'
                        />
                    }
                    else
                        return (
                            <CustomButton
                                key={index}
                                text={(middlePartStart + index).toString()}
                                color={pageIndex === middlePartStart + index ? ButtonColor.PURPLE : ButtonColor.WHITE}
                                onClick={(event) => onSelectPage(middlePartStart + index)}
                                width='w-10'
                                height='h-10'
                                rounded='rounded-full'
                            />
                        )
                })
            }
            {
                middlePartEnd > middlePartStart && middlePartEnd < totalPageCount - 2 &&
                <CustomButton
                    text="..."
                    color={ButtonColor.WHITE}
                    width='w-10'
                    height='h-10'
                    rounded='rounded-full'
                    enabled={false}

                />
            }
            {
                totalPageCount - 1 > 0 &&
                <CustomButton
                    text={(totalPageCount - 1).toString()}
                    color={pageIndex === totalPageCount - 1 ? ButtonColor.PURPLE : ButtonColor.WHITE}
                    onClick={(event) => onSelectPage(totalPageCount - 1)}
                    width='w-10'
                    height='h-10'
                    rounded='rounded-full'
                />
            }

            <CustomButton
                color={ButtonColor.PURPLE}
                width='w-30'
                height='h-10'
                rounded='rounded-full'
                onClick={(event) => onNextPage()}
                enabled={pageIndex < totalPageCount - 1}
            >
                Next
                <ArrowRight className='text-white' />
            </CustomButton>
        </div>
    )
}