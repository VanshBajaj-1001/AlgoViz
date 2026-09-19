import Sidebar from './components/Sidebar'
import SortingVisualizer from './components/SortingVisualizer'
import SearchingVisualizer from './components/SearchingVisualizer'
import { useState } from 'react'
import Dashboard from "./components/Dashboard"
import GraphVisualizer from './components/GraphVisualizer'
import TreeVisualizer from './components/TreeVisualizer'
import LinkedListVisualizer from './components/LinkedListVisualizer'
import StackVisualizer from './components/stackVisualizer'
import QueueVisualizer from './components/QueueVisualizer'
import HeapVisualizer from './components/HeapVisualizer'
import HashTableVisualizer from './components/HashTableVisualizer'
function App() {
  const [activePage,setActivePage]=useState("dashboard");
  return (
   <>
   <div className='min-h-screen bg-slate-950 text-white flex'>
    <Sidebar activePage={activePage}
    setActivePage={setActivePage}/>
    <main className='flex-1 p-8'>
{activePage === "dashboard" && (
  <Dashboard setActivePage={setActivePage} />
)}
{activePage==="sorting"&&<SortingVisualizer/>}
{activePage==="searching"&&<SearchingVisualizer/>}    
{activePage==="graphs"&&<GraphVisualizer />}
{activePage==="trees"&&<TreeVisualizer/>}
{activePage === "linkedlist" && <LinkedListVisualizer />}
{activePage === "stack" && <StackVisualizer />}
{activePage === "queue" && <QueueVisualizer />}
{activePage === "heap" && <HeapVisualizer />}
{activePage === "hashtable" && <HashTableVisualizer />}
</main>
    </div>
   </>
  )
}

export default App
