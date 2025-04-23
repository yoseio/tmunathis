export default function Layout(props: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      {props.children}
    </div>
  );
}
