import Image from "next/image";
import Link from "next/link";

interface Props {
    id: string;
    currentUserId: string;
    parentId: string | null;
    content: string;
    author: {
        name: string;
        image: string;
        id: string;
    };
}

function PostCard({
    id,
    currentUserId,
    parentId,
    content,
    author
}: Props) {
    return (
        <article
            className={"flex w-full flex-col rounded-xl bg-dark-2 p-7"}
        >
            <div className='flex items-start justify-between'>
                <div className='flex w-full flex-1 flex-row gap-4'>
                    <div className='flex flex-col items-center'>
                        <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
                            <Image
                                src={author.image}
                                alt='user_community_image'
                                fill
                                className='cursor-pointer rounded-full'
                            />
                        </Link>

                        <div className='thread-card_bar' />
                    </div>

                    <div className='flex w-full flex-col'>
                        <Link href={`/profile/${author.id}`} className='w-fit'>
                            <h4 className='cursor-pointer text-base-semibold text-light-1'>
                                {author.name}
                            </h4>
                        </Link>

                        <p className='mt-2 text-small-regular text-light-2'>{content}</p>

                        <div className={`mt-5 flex flex-col gap-3`}>
                            <div className='flex gap-3.5'>
                                <Image
                                    src='/assets/heart-gray.svg'
                                    alt='heart'
                                    width={24}
                                    height={24}
                                    className='cursor-pointer object-contain'
                                />
                                    <Image
                                        src='/assets/reply.svg'
                                        alt='heart'
                                        width={24}
                                        height={24}
                                        className='cursor-pointer object-contain'
                                    />
                                <Image
                                    src='/assets/repost.svg'
                                    alt='heart'
                                    width={24}
                                    height={24}
                                    className='cursor-pointer object-contain'
                                />
                                <Image
                                    src='/assets/share.svg'
                                    alt='heart'
                                    width={24}
                                    height={24}
                                    className='cursor-pointer object-contain'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default PostCard;
