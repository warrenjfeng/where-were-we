import './MemoryModePicker.css';

/**
 * MemoryModePicker Component
 * Allows users to select a memory from the preloaded list
 */
export default function MemoryModePicker({ memories, onSelectMemory, usedMemoryIds = [] }) {
  const availableMemories = memories.filter(m => !usedMemoryIds.includes(m.id));
  
  if (availableMemories.length === 0) {
    return (
      <div className="memory-picker">
        <div className="memories-complete">
          <h2>🎉 You've relived all the memories!</h2>
          <p>What a journey! Want to play again?</p>
        </div>
      </div>
    );
  }

  return (
    <div className="memory-picker">
      <div className="memory-picker-header">
        <h2>Choose a Memory to Relive 💭</h2>
        <p>Pick a place from your shared adventures</p>
      </div>
      
      <div className="memory-grid">
        {availableMemories.map((memory) => (
          <button
            key={memory.id}
            className="memory-card"
            onClick={() => onSelectMemory(memory)}
          >
            <div className="memory-card-icon">📍</div>
            <div className="memory-card-content">
              <div className="memory-location">{memory.location}</div>
              <div className="memory-caption">{memory.caption}</div>
            </div>
          </button>
        ))}
      </div>
      
      <div className="memory-progress">
        {usedMemoryIds.length > 0 && (
          <p>
            {usedMemoryIds.length} of {memories.length} memories explored
          </p>
        )}
      </div>
    </div>
  );
}


