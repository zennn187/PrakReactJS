import { useState } from "react";
import frameworkData from "./framework.json";

export default function Frameworklist() {
  /** Deklrasai state **/
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  /** Deklrasai Logic Search & Filter **/
  const _searchTerm = searchTerm.toLowerCase();
  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name
        .toLowerCase()
        .includes(_searchTerm) ||
      framework.description
        .toLowerCase()
        .includes(_searchTerm) ||
        framework.details.developer
        .toLowerCase()
        .includes(_searchTerm) ||
        framework.details.releaseYear
        .toString()
        .includes(_searchTerm);

    const matchesTag = selectedTag
      ? framework.tags.includes(selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });

  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <input
        type="text"
        name="searchTerm"
        placeholder="Search framework..."
        className="w-full p-2 border border-gray-300 rounded mb-4"
        onChange={(e)=>setSearchTerm(e.target.value)}
      />

      <select
        name="selectedTag"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        onChange={(e)=>setSelectedTag(e.target.value)}>

        <option value="">All Tags</option>
        {allTags.map((tag, index) => (
          <option key={index} value={tag}>
            {tag}
          </option>
        ))}
      </select>
      {filteredFrameworks.map((item) => (
        <div
          key={item.id}
          className="border border-gray-200 rounded-lg p-5 mb-5 bg-white"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>

          <div className="flex gap-4 mb-4 text-sm text-gray-500">
            <span>{item.details.developer}</span>
            <span>{item.details.releaseYear}</span>
          </div>

          <a
            href={item.details.officialWebsite}
            className="text-blue-600 hover:underline text-sm inline-block mb-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            kunjungi website
          </a>

          <div className="flex gap-2 flex-wrap">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}