import ModuleCard from "./module-card";

const ModulesList = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 py-10">
      <ModuleCard id="qcasd" name="Tech News" rssFeedUrl="https://services.infokanal.com/feed/rss/ai"/>
      <ModuleCard id="qba" name="My City News" rssFeedUrl="https://services.infokanal.com/feed/rss/ai"/>
      <ModuleCard id="eqws" name="USA News" rssFeedUrl="https://services.infokanal.com/feed/rss/ai"/>

    </div>
  );
};

export default ModulesList;
