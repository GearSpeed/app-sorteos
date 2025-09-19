type Props = {
  width?: number;
  height?: number;
  colored?: boolean;
  className?: string;
};

export default function YouTubeComponent({
  width = 48,
  height = 48,
  colored = true,
  className = '',
}: Props) {
  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Círculo-blur que se ilumina */}
      <span
        className={`absolute inset-0 rounded-full bg-white
          transition-all duration-300 ease-out
          opacity-0 scale-75 blur-md
          group-hover:opacity-40 group-hover:scale-110`}
      />

      {/* Icono */}
      <svg
        viewBox="0 -7 48 48"
        width={width}
        height={height}
        className={`relative z-10 transition-all duration-300 ease-out
          ${colored ? 'text-red-600' : 'text-gray-400 grayscale'}
          group-hover:text-red-600 group-hover:grayscale-0
          group-hover:animate-wiggle
          ${className}`}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-200,-368)" fill="currentColor">
            <path d="M219.044 391.27v-13.583l12.968 6.814-12.968 6.769zM247.52 375.334s-.47-3.331-1.908-4.798c-1.826-1.926-3.872-1.935-4.81-2.047-6.717-.489-16.793-.489-16.793-.489h-.02s-10.076 0-16.793.489c-.939.112-2.983.121-4.81 2.047C200.948 372.003 200.48 375.334 200.48 375.334s-.48 3.913-.48 7.824v3.667c0 3.913.48 7.824.48 7.824s.468 3.331 1.907 4.798c1.826 1.926 4.225 1.866 5.293 2.067 3.84.371 16.32.486 16.32.486s10.086-.015 16.803-.504c.938-.113 2.983-.122 4.81-2.048 1.438-1.467 1.908-4.798 1.908-4.798s.48-3.911.48-7.824v-3.667c0-3.912-.48-7.825-.48-7.825z" />
          </g>
        </g>
      </svg>
    </div>
  );
}