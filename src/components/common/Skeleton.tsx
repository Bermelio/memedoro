import skeletonGif from '../../assets/skeletom.gif';

function Skeleton(){
    return (
        <div className="flex justify-center items-center h-20 w-11/10 mb-4">
            <img className='w-10/20' src={skeletonGif} alt="skeleton dancing" />
        </div>
    )
}

export default Skeleton;